class TwitchPyramid {
  ChatContainer = 'section[data-test-selector="chat-room-component-layout"]';
  ChatLine = '.chat-line__message';
  ROOT = '#root div';
  size;

  constructor() {
    this.store = this.getStore();
    this.chatService = this.getChatService();
    this.userLogin = this.chatService?.props?.currentUserLogin;
  }

  findReactParents = (node, predicate, maxDepth = 15, depth = 0) => {
    let success = false;
    try {
      success = predicate(node);
    } catch (_) {}
    if (success) return node;
    if (!node || depth > maxDepth) return null;

    const { return: parent } = node;
    if (parent) {
      return this.findReactParents(parent, predicate, maxDepth, depth + 1);
    }

    return null;
  };

  findReactChildren(node, predicate, maxDepth = 15, depth = 0) {
    let success = false;
    try {
      success = predicate(node);
    } catch (_) {}
    if (success) return node;
    if (!node || depth > maxDepth) return null;

    const { child, sibling } = node;
    if (child || sibling) {
      return (
        this.findReactChildren(child, predicate, maxDepth, depth + 1) ||
        this.findReactChildren(sibling, predicate, maxDepth, depth + 1)
      );
    }

    return null;
  }

  getReactInstance = (el) => {
    for (const k in el) {
      if (k.startsWith('__reactInternalInstance$')) {
        return el[k];
      }
    }
  };

  getChatService = () => {
    const node = this.findReactChildren(
      this.getReactInstance(document.querySelectorAll(this.ROOT)[0]),
      (n) => n.stateNode?.join && n.stateNode?.client,
      1000
    );

    return node?.stateNode;
  };

  getChatLine = (el) => {
    const inst = this.getReactInstance(el);

    return {
      component: inst?.return?.stateNode,
      instance: inst,
    };
  };

  /**
   * Get chat lines with the element & react component, optionally filtered by an ID list
   */
  getChatLines = (idList = null) => {
    let lines = Array.from(document.querySelectorAll(this.ChatLine)).map(
      (element) => {
        const chatLine = this.getChatLine(element);

        return {
          element,
          component: chatLine.component,
          inst: chatLine.instance,
        };
      }
    );

    if (!!idList) {
      lines = lines.filter(({ component }) =>
        idList?.includes(component?.props?.message?.id)
      );
    }

    return lines;
  };

  getChat = () => {
    const node = this.findReactParents(
      this.getReactInstance(document.querySelectorAll(this.ChatContainer)[0]),
      (n) => n.stateNode?.props.onSendMessage
    );

    return node?.stateNode;
  };

  getStore = () => {
    let store = localStorage.getItem('twitch-pyramids');
    try {
      store = JSON.parse(store);
    } catch (e) {
      store = [];
    }

    return store || [];
  };

  save = (attempt) => {
    this.store.push(attempt);
    localStorage.setItem('twitch-pyramids', JSON.stringify(this.store));

    console.log(attempt);
  };

  getViewers = () => {
    const views = document.querySelector(
      '[data-test-selector="stream-info-card-component__description"]'
    );

    if (!views) return;

    return Number(views.textContent.replace('Dota 2', '').replace(/\D/g, ''));
  };

  getCookieValue = (name) =>
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';

  getInputValue = () => {
    const el = document.querySelector('.chat-input textarea');
    if (el) return el.value;
    return false;
  };

  setInputValue = (value) => {
    const el = document.querySelector('.chat-input textarea');
    if (!el) return false;

    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));

    const inst = this.getReactInstance(el);

    if (inst) {
      const props = inst.memoizedProps;
      if (props && props.onChange) {
        props.onChange({ target: el });
      }
    }
  };

  calculateInterruptions = () => {
    const chatLines = this.getChatLines();
    const myIds = [];

    // `some()` lets the loop quit early so it doesn't process the whole chat
    chatLines.reverse().some((n) => {
      if (
        n.component?.props?.message?.user?.login === this.userLogin &&
        n.component?.props?.message?.message.includes(this.emote) &&
        !n.component?.props?.message?.message.includes('HYPERCLAP')
      ) {
        myIds.push(n.component?.props?.message?.id);
        return false;
      }

      // If we found the end of the pyramid, quit the loop
      if (myIds[this.size * 2 - 2]) {
        return true;
      }

      return false;
    });

    const pyramidEndId = myIds[this.size * 2 - 2];
    const pyramidStartId = myIds[0];

    let myPyramidStarted = false;
    let myPyramidEnded = false;
    let interruptions = 0;

    chatLines.some((n) => {
      if (myPyramidEnded) {
        return true;
      }

      const chatLine = n.component?.props?.message;
      const mine = chatLine?.user?.userLogin === this.userLogin;

      if (pyramidStartId === chatLine.id) {
        myPyramidStarted = true;
        return false;
      }

      if (pyramidEndId === chatLine.id) {
        myPyramidEnded = true;
        return true;
      }

      if (myPyramidStarted && !mine) {
        ++interruptions;
        return false;
      }
    });

    return interruptions;
  };

  clickSend = () => {
    document.querySelector('[data-a-target="chat-send-button"]').click();
  };

  send = (value, cb) => {
    this.setInputValue(value);
    this.clickSend();
    const keepSending = setInterval(() => {
      if (!this.getInputValue()) {
        clearInterval(keepSending);
        cb();
      } else {
        this.clickSend();
      }
    }, 100);
  };

  sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  // Edit the emote below. I have the forsenCD currently. Then edit the size of the pyramid. I have 3 currently and it looks as follows:
  /**
    forsenCD
    forsenCD forsenCD
    forsenCD forsenCD forsenCD
    forsenCD forsenCD
    forsenCD

   */
  run = async (emote = 'AYAYA', size = 3) => {
    if (!this.userLogin) {
      return 'No user found';
    }

    if (!emote || !size) {
      return 'Example usage: pyramid.run("PepeLA")';
    }

    if (size < 2) {
      return "Pyramid can't be smaller than 2 emoticons";
    }

    this.size = size;
    this.emote = emote;

    const total = size * 2;
    for (let i = 1; i < total; i++) {
      await new Promise((resolve) => {
        let n = i > size ? size * 2 - i : i;
        this.send((emote + ' ').repeat(n), resolve);
      });
    }

    // Necessary to get latest chat lines
    await this.sleep(500);

    const interruptions = this.calculateInterruptions();
    this.save({
      interruptions,
      emote,
      size,
      views: this.getViewers(),
      user: this.userLogin,
    });
    // You can edit the text below to have nothing or to have a text display when the pyramid is interrupted.
    if (interruptions) {
      await new Promise((resolve) => {
        this.send(
          `You had ${interruptions} people ruin the " ${emote} " pyramid. how unlucky forsenCD`,
          resolve
        );
      });
      return;
    }
    // Success message when it's completed successfully.
    await new Promise((resolve) => {
      this.send(`${emote} Clap`, resolve);
    });
  };
}

let pyramid = new TwitchPyramid();
pyramid.run();

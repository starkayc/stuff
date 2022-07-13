#pragma once

#define VIAL_KEYBOARD_UID {0xA6, 0x7D, 0xBA, 0x5E, 0x9E, 0xC6, 0xC9, 0xCD}

/* Change USB Polling Rate to 1000hz and a larger keys per scan for elite gaming*/
#define USB_POLLING_INTERVAL_MS 1
#define QMK_KEYS_PER_SCAN 12

// features below are intended to reduce size of final firmware
#define DYNAMIC_KEYMAP_LAYER_COUNT 2
#define VIAL_COMBO_ENTRIES 4
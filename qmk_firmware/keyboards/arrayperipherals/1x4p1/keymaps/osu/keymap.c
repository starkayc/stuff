#include QMK_KEYBOARD_H

void encoder_update_user(uint8_t index, bool clockwise) { // Encoder
  if (index == 0) {
    if (clockwise) {
      tap_code(KC_MS_WH_UP); // Scroll Up
    } else {
      tap_code(KC_MS_WH_DOWN); // Scroll Down
    }
  }
}

const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
	[0] = LAYOUT_ortho_1x5(KC_Z, KC_X, KC_ESC, KC_GRV, TG(1)), // Layer 0
	[1] = LAYOUT_ortho_1x5(KC_MPRV, KC_MPLY, KC_MNXT, KC_MUTE, TG(1)), // Layer 1
  [2] = LAYOUT_ortho_1x5(KC_NO, KC_NO, KC_NO, KC_NO, KC_NO), // Layer 2
  [3] = LAYOUT_ortho_1x5(KC_NO, KC_NO, KC_NO, KC_NO, KC_NO) // Layer 3
};

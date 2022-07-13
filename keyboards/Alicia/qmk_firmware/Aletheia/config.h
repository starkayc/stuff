/*
Copyright 2021 Quark

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

#pragma once

#include "config_common.h"

/* USB Device descriptor parameter */
#define VENDOR_ID    0x514B // QK Quark
#define PRODUCT_ID   0x414C // AL Aletheia
#define DEVICE_VER   0x0001
#define MANUFACTURER quark
#define PRODUCT      Aletheia

/* key matrix size */
#define MATRIX_ROWS 5
#define MATRIX_COLS 15

/*
 * Keyboard Matrix Assignments
 *
 * Change this to how you wired your keyboard
 * COLS: AVR pins used for columns, left to right
 * ROWS: AVR pins used for rows, top to bottom
 * DIODE_DIRECTION: COL2ROW = COL = Anode (+), ROW = Cathode (-, marked on diode)
 *                  ROW2COL = ROW = Anode (+), COL = Cathode (-, marked on diode)
 *
 */
#define MATRIX_ROW_PINS { B0, F0, B6, B5, B4 }
#define MATRIX_COL_PINS { F1, F4, F5, F6, F7, C6, C7, D2, D1, D0, D3, D5, D4, D6, D7 }

#define RGBLIGHT_LIMIT_VAL 150

/* COL2ROW, ROW2COL */
#define DIODE_DIRECTION COL2ROW

/* Debounce reduces chatter (unintended double-presses) - set 0 if debouncing is not needed */
#define DEBOUNCE 5

/* disable these deprecated features by default */
#define NO_ACTION_MACRO
#define NO_ACTION_FUNCTION

/* Bootmagic Lite key configuration */
#define BOOTMAGIC_LITE_ROW 0
#define BOOTMAGIC_LITE_COLUMN 0

#define RGB_DI_PIN B7

#ifdef RGB_DI_PIN
	#define RGBLIGHT_ANIMATIONS
	#define RGBLED_NUM 23
	#define RGBLIGHT_HUE_STEP 8
	#define RGBLIGHT_SAT_STEP 8
	#define RGBLIGHT_VAL_STEP 8
#endif

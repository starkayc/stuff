#pragma once

#define VIAL_KEYBOARD_UID {0xA6, 0x7D, 0xBA, 0x5E, 0x9E, 0xC6, 0xC9, 0xCD}
#define VIAL_UNLOCK_COMBO_ROWS {0, 2}
#define VIAL_UNLOCK_COMBO_COLS {0, 13}

/* Change USB Polling Rate to 1000hz and a larger keys per scan for elite gaming*/
#define USB_POLLING_INTERVAL_MS 1
#define QMK_KEYS_PER_SCAN 12

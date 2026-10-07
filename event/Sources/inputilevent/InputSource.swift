import Clibevdev
import Clibinput
import Input

func keyboard(_ event: borrowing core.event_ptr) -> InputEvent {
    let raw = core.get_keyboard_event(event)
    let name = String(
        cString: libevdev_event_code_get_name(
            0x01,  // EV_KEY from <linux/input-event-codes.h>
            libinput_event_keyboard_get_key(raw)
        )
    )

    switch libinput_event_keyboard_get_key_state(raw) {
    case LIBINPUT_KEY_STATE_PRESSED:
        return InputEvent.key(name: name, hold: true)
    case LIBINPUT_KEY_STATE_RELEASED:
        return InputEvent.key(name: name, hold: false)
    default:
        fatalError("Invalid key state")
    }
}

func button(_ event: borrowing core.event_ptr) -> InputEvent {
    let raw = core.get_pointer_event(event)
    let name = String(
        cString: libevdev_event_code_get_name(
            0x01,  // EV_KEY from <linux/input-event-codes.h>
            libinput_event_pointer_get_button(raw)
        )
    )

    switch libinput_event_pointer_get_button_state(raw) {
    case LIBINPUT_BUTTON_STATE_PRESSED:
        return InputEvent.btn(name: name, hold: true)
    case LIBINPUT_BUTTON_STATE_RELEASED:
        return InputEvent.btn(name: name, hold: false)
    default:
        fatalError("Invalid button state")
    }
}

func motion(_ event: borrowing core.event_ptr) -> InputEvent {
    let raw = core.get_pointer_event(event)
    let dx = libinput_event_pointer_get_dx(raw)
    let dy = libinput_event_pointer_get_dy(raw)

    return InputEvent.move(
        x: Int(dx == 0 ? 0 : copysign(1, dx)),
        y: Int(dy == 0 ? 0 : copysign(1, dy)),
    )
}

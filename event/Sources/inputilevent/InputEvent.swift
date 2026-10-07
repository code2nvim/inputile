import Input

enum InputEvent {
    case key(name: String, hold: Bool)
    case btn(name: String, hold: Bool)
    case move(x: Int, y: Int)
}

func iterateInput() -> AnyIterator<InputEvent> {
    let udev = core.make_udev()
    let input = core.make_input(udev)
    var fds = core.fds(input)
    core.assign_seat(input, "seat0")

    return AnyIterator {
        while true {
            core.poll(&fds)
            core.dispatch(input)
            return matchEvent(input)
        }
    }
}

func matchEvent(_ input: borrowing core.input_ptr) -> InputEvent? {
    while let event = .some(core.make_event(input)), core.has_value(event) {
        switch core.get_type(event) {
        case LIBINPUT_EVENT_KEYBOARD_KEY:
            return keyboard(event)
        case LIBINPUT_EVENT_POINTER_BUTTON:
            return button(event)
        case LIBINPUT_EVENT_POINTER_MOTION:
            return motion(event)
        default:
            break
        }
    }
    return nil
}

import Input

struct InputEvent: Codable, Hashable {
    enum EventType: String, Codable {
        case key, btn, move
    }
    enum EventData: Codable, Hashable {
        case key(name: String, hold: Bool)
        case btn(name: String, hold: Bool)
        case move(x: Int, y: Int)
    }
    let type: EventType
    let data: EventData
}

func iterateInput() -> AsyncStream<InputEvent> {
    AsyncStream { continuation in
        Task.detached {
            let udev = core.make_udev()
            let input = core.make_input(udev)
            var fds = core.fds(input)
            core.assign_seat(input, "seat0")

            while !Task.isCancelled {
                core.poll(&fds)
                core.dispatch(input)
                while let event = matchEvent(input) {
                    continuation.yield(event)
                }
            }
        }
    }
}

func matchEvent(_ input: borrowing core.input_ptr) -> InputEvent? {
    while let event = .some(core.make_event(input)), core.has_value(event) {
        switch core.get_type(event) {
        case LIBINPUT_EVENT_KEYBOARD_KEY:
            return InputEvent(type: .key, data: keyboard(event))
        case LIBINPUT_EVENT_POINTER_BUTTON:
            return InputEvent(type: .btn, data: button(event))
        case LIBINPUT_EVENT_POINTER_MOTION:
            return InputEvent(type: .move, data: motion(event))
        default:
            break
        }
    }
    return nil
}

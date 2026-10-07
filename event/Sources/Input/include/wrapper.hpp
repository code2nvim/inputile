#pragma once

#include "memory.hpp"

#include <libinput.h>
#include <string>

namespace core {

inline auto fds(const input_ptr& input) -> pollfd
{
    return pollfd {
        .fd = libinput_get_fd(input.get()),
        .events = 0x001, // <sys/poll.h> POLLIN
        .revents = 0,
    };
}

inline void assign_seat(const input_ptr& input, const std::string& seat)
{
    libinput_udev_assign_seat(input.get(), seat.c_str());
}

inline void poll(pollfd& fds)
{
    poll(&fds, 1, -1);
}

inline void dispatch(const input_ptr& input)
{
    libinput_dispatch(input.get());
}

inline auto has_value(const event_ptr& event) -> bool
{
    return event.get() != nullptr;
}

inline auto get_type(const event_ptr& event) -> libinput_event_type
{
    return libinput_event_get_type(event.get());
}

inline auto get_keyboard_event(const event_ptr& event) // -> libinput_event_keyboard*
{
    return libinput_event_get_keyboard_event(event.get());
}

inline auto get_pointer_event(const event_ptr& event) // -> libinput_event_pointer*
{
    return libinput_event_get_pointer_event(event.get());
}

}

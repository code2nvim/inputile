#pragma once

#include "system.hpp"

#include <libinput.h>
#include <memory>

namespace core {

using udev_ptr = std::unique_ptr<udev, decltype(&udev_unref)>;
using input_ptr = std::unique_ptr<libinput, decltype(&libinput_unref)>;
using event_ptr = std::unique_ptr<libinput_event, decltype(&libinput_event_destroy)>;

inline auto make_udev() -> udev_ptr
{
    return udev_ptr {
        udev_new(),
        udev_unref,
    };
}

inline auto make_input(const udev_ptr& udev) -> input_ptr
{
    constexpr static auto interface = libinput_interface {
        .open_restricted = open_restricted,
        .close_restricted = close_restricted,
    };
    return input_ptr {
        libinput_udev_create_context(&interface, nullptr, udev.get()),
        libinput_unref,
    };
}

inline auto make_event(const input_ptr& input) -> event_ptr
{
    return event_ptr {
        libinput_get_event(input.get()),
        libinput_event_destroy,
    };
}

}

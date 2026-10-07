#pragma once

extern "C" {
#include <fcntl.h>
#include <sys/poll.h>
#include <unistd.h>
}

namespace core {

inline auto open_restricted(const char* path, int flags, [[maybe_unused]] void* user_data) -> int
{
    const int desc = open(path, flags); // NOLINT(cppcoreguidelines-pro-type-vararg)
    return desc < 0 ? 1 : desc;
}

inline void close_restricted(int desc, [[maybe_unused]] void* user_data)
{
    close(desc);
}

}

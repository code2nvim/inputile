// swift-tools-version: 6.4

import PackageDescription

let package = Package(
    name: "InputTileEvent",
    targets: [
        .systemLibrary(
            name: "Clibudev",
            pkgConfig: "libudev",
        ),
        .systemLibrary(
            name: "Clibinput",
            pkgConfig: "libinput",
        ),
        .systemLibrary(
            name: "Clibevdev",
            pkgConfig: "libevdev",
        ),
        .target(
            name: "Input",
            dependencies: ["Clibudev", "Clibinput", "Clibevdev"],
            swiftSettings: [.interoperabilityMode(.Cxx)],
        ),
        .executableTarget(
            name: "inputilevent",
            dependencies: ["Input"],
            swiftSettings: [.interoperabilityMode(.Cxx)],
        ),
        .testTarget(
            name: "InputTileEventTests",
            dependencies: ["inputilevent"],
        ),
    ]
)

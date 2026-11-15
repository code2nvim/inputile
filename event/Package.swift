// swift-tools-version: 6.4

import PackageDescription

let package = Package(
    name: "InputTileEvent",
    dependencies: [
        .package(url: "https://github.com/apple/swift-nio", from: "2.0.0")
    ],
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
            dependencies: [
                .product(name: "NIOCore", package: "swift-nio"),
                .product(name: "NIOPosix", package: "swift-nio"),
                "Input",
            ],
            swiftSettings: [.interoperabilityMode(.Cxx)],
        ),
        .testTarget(
            name: "InputTileEventTests",
            dependencies: ["inputilevent"],
        ),
    ]
)

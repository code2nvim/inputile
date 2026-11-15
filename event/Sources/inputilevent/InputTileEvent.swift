import Foundation
import NIOCore
import NIOPosix

let path = "/tmp/inputile.sock"
let group = MultiThreadedEventLoopGroup.singleton.next()

@main
struct InputTileEvent {
    static func main() async {
        do {
            let bootstrap = ClientBootstrap(group: group)
            let channel = try await bootstrap.connect(unixDomainSocketPath: path).get()

            let encoder = JSONEncoder()
            encoder.outputFormatting = [.sortedKeys]

            defer {
                try? await channel.close().get()
                print("channel closed")
            }

            var events = Set<InputEvent>()
            var checkTime = ContinuousClock.now
            for await event in iterateInput() {
                events.insert(event)

                if checkTime.duration(to: .now) >= .milliseconds(50) {
                    let json = (try? encoder.encode(events))!
                    let message = String(data: json, encoding: .utf8)! + "\n"
                    var buffer = channel.allocator.buffer(capacity: message.utf8.count)
                    buffer.writeString(message)
                    try await channel.writeAndFlush(buffer).get()
                    checkTime = .now
                    events.removeAll()
                }
            }
        } catch {
            print("error: \(error)")
        }

    }
}

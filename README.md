# InputTile

Keyboard and mouse input visualizer

|       |       |
| :---: | :---: |
| ![inputilevent](https://i.postimg.cc/BQ4Rs9xx/image.webp) | ![mouse](https://i.postimg.cc/L5Y58gdN/mouse.webp) |

## Build and run

> **Requirement:** libinput, Clang, Swift and Deno

> **Note:** Make sure your user is in the `input` group

### Runtime

```sh
swift build # inside event/
```

### Client (launches runtime automatically if `inputilevent` is in `$PATH`)

```sh
deno run dev # for development mode
```

# Small functional cli drawing app

## Scripts

```bash
yarn start # run it
yarn dev # development
```

## Goal

Create a cli programm to draw

```bash
----------------------
|                    |
|                    |
|                    |
|                    |
----------------------

Last command: l 1 2 6 2
----------------------
|                    |
|xxxxxx              |
|                    |
|                    |
|                    |
----------------------

Last command: r 16 1 20 4
----------------------
|               xxxxx|
|xxxxxx         x   x|
|               x   x|
|               xxxxx|
|                    |
----------------------

Last command: l 6 2 6 5
----------------------
|               xxxxx|
|xxxxxx         x   x|
|     x         x   x|
|     x         xxxxx|
|     x              |
----------------------

Last command: b 10 3 o
----------------------
|oooooooooooooooxxxxx|
|xxxxxxooooooooox   x|
|     xooooooooox   x|
|     xoooooooooxxxxx|
|     xoooooooooooooo|
----------------------

last command: q # quit
```

## Open Points / Issues

Overall the drawing tool was implemented functional.
Following points need further attention:

- no testing of components
- points to create lines should be on the same level and in the order of left to right called or top to bottom
- all reference or seed points should be called in the above mentioned order (line, rectangle)

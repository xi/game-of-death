# TODO
## I. UI
+ [Multiplayer]
+ Display: Where may a player build?
+ keyboard controls
+ reset board after play
+ better win/loose indication
+ pause on win/loose
+ refactor steps
+ structure board controls

## II. Logic
+ Szenario objects (loadable)
    + img link (preview)
+ [Multiplayer]
+ Logic: Where may a player build?


## III. Gamedesign
+ wincondition
    + annihilate everyone else
    + defend structure X
    + survive
    + cover area of size n
    + travel to destiny
        + race against AI
    + tutorial level
    + you must destroy an enemy structure. It consists of several 4-blocks and an additional structure. the tick is to trigger the structure to "explode" and destroy the blocks with it
        + background: these blocks are hard to destroy for enemoies, but easy by yourself

+ aditional rules
    + where may a player build?
    + how many rounds until the game ends

+ Multiplayer
    + Controll points
        + n islands
        + players can only build on islands a) they own at least 1 tile on b) they own the majority of tiles on c) they were the last to touch the centertile of
        + every player starts out owning a stabil structure on exactly 1 island

## IV. Hosting
+ where?
+ continuous deployment
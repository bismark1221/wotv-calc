### Chains

#### How does the game work ?
The first thing you should know when starting to play with chain, is that the game run on 60 frames per second

This is important because hits of abilities hit each X frames and not in seconds or milliseconds

But we can easily find that 1 frame = 16.66 milliseconds

#### What is a chain ?
It's when 2 units, or more, hit the target whit alternating hits

Here a small exemple: The first unit will hit first, then the second unit hit, next the first unit hit again, then the second one, etc...

When you see in game "Combo", it's that you are already in a chain :)

#### Why chaining is important ?
Because it's nice to see high combo ^^

No I'm kidding, it's important because at each combo the power of the hits increase by a certain rate up to 400%

Here is the detail of the modifications
 - Neutral combo : 10%
 - Elemental combo : 20% by elements
 - Spark combo : 30%

Knowing that each of thoses combo can be combined, if you do a spark fire/water combo so the power gain 80% in one hit

You can find bellow a table which show the number of hit necessary to reach the maximum power

![chain modifier][chain_modifier]

#### Break a chain
There is 2 way to break a chain
 - An unit hit twice in a row
 - If there is more than 21 frames between 2 hits

When a chain is break, we start again at 0 combo and the power drop to 100%

#### Add a finisher in a chain
At any moment you can add another unit in a chain to take advantage of the rise of power

It become interested to use some finisher, units who have abilities which do only one hit

With those spells, all their power is rise with one hit, moreover those abilities are more powerfull than the chain skills generally

So we need to try to include them as soon as the power is at 400%

#### Analyse data find on internet
There is multiple way to write data about abilities

Let's take an example with Tidus' Quick Hit
 - Frames version : 22-5-5-5-5-5-5-5-5-5-5-20
 - Cumulative version : 22-27-32-37-42-47-52-57-62-67-72-92
 - ffbe-chain version : 0-5-5-5-5-5-5-5-5-5-5-20

The first number in the 2 first example is the first hit of the ability, here 22

That mean that Tidus will hit with his Quick Hit at 22 frames after you tap on the unit, so that's 22 x 16.66 = 366.52 milliseconds

Next thanks to the first example, we know that the second hit came 5 frames after the first one, so that's 27 frames (We can find this data on the cumulative version)

#### What's happen with a dualwield/dualcast
Let's review again our Tidus with his Quick Hit (22-5-5-5-5-5-5-5-5-5-5-20)

Let's imagine that Tidus has 2 weapons, so a dualcast, in this case we need another data : At when moment start the 2nd spell ?

We can find the extracted data the cast time of any ability, for Quick Hit it's 20 frames

In theory we should have the following result
 - 1st spell: 22-27-32-37-42-47-52-57-62-67-72-92
 - 2nd spell: 42-47-52-57-62-67-72-77-82-87-92-112

![fake tidus quick hit][fake_quick_hit]

Unfortunately is not so simple... Thank to Whaat on reddit, we have discover that some abilities have an extra delay, named offset, but this data is not on the data files... ([Multi-Hit Chain Reference/Hit Data] and [frame delays on dualhit])

For the Quick Hit, we have find that the offset is 16 frames, so here are the real data for Tidus
 - 1st spell: 22-27-32-37-42-47-52-57-62-67-72-92
 - 2nd spell: 58-63-68-73-78-83-88-93-98-103-108-128

![real tidus quick hit][real_quick_hit]

Like you can see, the 2nd spell start before the ending of the first one, it's the case for lot of units

Here is the case of Orlandeau who "wait" for his first spell to finish before launching the 2nd one

![orlandeau][orlandeau]

#### What is a spark ?
A spark combo is when 2 units hit on the same frame, be careful only 1 of the 2 hit is concidered as a spark

#### The positioning is important when chaining
A new discovery, for myself, it's that the positioning can play an important part in your chains

An unit who is on a smaller position than another will always hit before the other, even in a spark combo

And it's in this case that some weird things can happen...

It's the case of Tidus and Pirate Jake, I put here a small video of my youtube channel to show this odd behavior

<iframe class="youtube" width="560" height="315" src="https://www.youtube.com/embed/vTmBNy9jMDY" frameborder="0" allowfullscreen></iframe>

But don't worry, this is already implemented on the simulator :)

![chain tidus and pirate jake][tidus_pirate_jake]

##### Macros
I will not explain here how to use macro on your emulators because there is already lot a pretty good tutorials

I just put some little rules which can be useful
 - Memu : Be careful, you need to have an extra empty line at the end of your macro files (This empty line is generated in the simulator, so if you click on the Copy button there shouldn't have any problems)

[chain_modifier]: ../../assets/how-to/ffbe_chain_modifier.png "Chain Modifier"
[fake_quick_hit]: ../../assets/how-to/fake_quick_hit.png "Fake Quick Hit"
[real_quick_hit]: ../../assets/how-to/real_quick_hit.png "Real Quick Hit"
[orlandeau]: ../../assets/how-to/orlandeau.png "Chain Orlandeau"
[tidus_pirate_jake]: ../../assets/how-to/tidus_pirate_jake.png "Chain Tidus and Pirate Jake"
[Multi-Hit Chain Reference/Hit Data]: https://dm.reddit.com/r/FFBraveExvius/comments/5dbam6/jp_multihit_chain_referencehit_data
[frame delays on dualhit]: https://dm.reddit.com/r/FFBraveExvius/comments/6ct7uc/frame_delays_for_many_popular_chaining_moves

---
title: Relay Computer
description: >-
  I designed and made a relay computer that adds or subtracts two 4-bit binary numbers from scratch.
  Practical? No. Fun? Absolutely.
date: 2026-05-18
updated: 2026-08-24
image:
  path: /assets/projects/relay-computer/pcb.jpg
  alt: A green printed circuit board for a relay computer
tags:
  - Design
  - Electronics
  - Circuitry
---

<!-- markdownlint-disable MD001 -->

> Computers are complicated.
> So I made one from scratch.

Yup, you heard that right&mdash;I built a computer from the ground up!

Fine, that might not be the most accurate statement.
It's not much of a *"computer,"* and I definitely didn't create it from nothing.

But for all intents and purposes, I'll call it a **computer**.

## Context

Where did I get the idea to build a computer?
Great question.

At the end of eighth grade, we were tasked with something new: a **Capstone Project**.

A **Capstone Project** is a final academic assignment usually completed at the end of middle or high school, requiring students to apply what they've learned into a cumulative experience.

In eighth grade, I had to do one.

I had plenty of ideas, but with my interests in computers, math, and electronics, a relay computer peaked my interest.

A **relay computer** is a computing device that uses electromechanical relays to make binary calculations using logic gates.
I built one.

## Research

The first step of a Capstone Project is **research**.

I gathered information from various sources, such as [relaiscomputer.nl](https://www.relaiscomputer.nl/index.php/elements), and wrote many, many notes.

I learned how to connect relays together to make an [**Full Adder**](https://www.geeksforgeeks.org/digital-logic/full-adder-in-digital-logic/), which takes three binary inputs and calculates two ouputs.

![A circuit diagram for a full adder made out of relays](/assets/projects/relay-computer/full-adder.jpg)
<!-- markdownlint-disable-next-line MD033 -->
<small>**Image Credit:** [Jeroen Brinkman](https://www.relaiscomputer.nl)</small>

## Design

I knew I wanted to make a custom **printed circuit board** (PCB) for this.

I opened up [KiCad](https://www.kicad.org/), an open-source PCB design program, and created a new project, and started with a **schematic**.
I connected all **20 relays**, **33 LEDs**, **9 switches**, and a few other components to each other.

### Testing

How would I know that the relay computer would actually work?

I printed out the [schematic](/github/relay-computer/blob/main/docs/schematic.pdf) and used a highlighter to mark power flow.
I would draw a line for power coming out of the switch, into the relay, through many more, and finally to the output LED.

After testing many equations, both addtion and subtraction, and comparing the binary output to what I calculated in my head, **it worked**!

### Circuit Board

![A printed circuit board in KiCad on a laptop](/assets/projects/relay-computer/kicad.jpg)

My relay computer wouldn't just be a schematic on a piece of paper, so I converted it into a new PCB document.

In KiCad, I specified the PCB size, component layout, and silkscreen design.
Now on to the fun part: routing.

KiCad showed me which wires had to connect to where, so I started with the short traces.
I connected the resistors, LEDs, and relays to each other in each "block."
Then, I connected each block to each other.
I connected the input switches and output LEDs to each other, finishing the circuit board.

## Soldering

I sent off my PCB Gerber files to [JLCPCB](https://jlcpcb.com/), and after a ridiculous shipping fee, it arrived.
Time to get components!

I already had [relays](https://www.aliexpress.us/item/3256805988664644.html) from another project, so I grabbed 20 of them.
I also had 33 LEDs, 33 resistors, 28 relays, and 9 switches. But no barrel jack.

My relay computer required a barrel jack for 5V input, but I didn't have any on hand.
Or did I?

![A barrel jack cut off of an Arduino Uno board](/assets/projects/relay-computer/barrel-jack.jpg)

I had a broken Arduino Uno board lying around, so I salvaged the barrel jack from that.
I cut the bottom-left corner off the board and desoldered the connector.
All done!

Time to solder!
I gathered all of the tools and materials I needed&mdash;a soldering iron, the necessary components, a multimeter, and a few other tools.

![A soldering iron and other tools surrounding a circuit board](/assets/projects/relay-computer/soldering.jpg)
![Diodes, resistors, and LEDs on a circuit board](/assets/projects/relay-computer/components.jpg)

I inserted the diodes, resistors, and LEDs into the holes in the PCB and soldered them in place.
Perfect&mdash;right?

Whenever I solder, I always test my connections to make sure they work.
I ran power between each LED's positive leg and ground, but one didn't work.

After futher investigation, I discovered that the **ground plane** didn't connect that LED's cathode to the other grounds.
It was essentially "broken."

![A wire taped to the bottom of a circuit board](/assets/projects/relay-computer/fix.jpg)

To fix this, I used an X-ACTO blade to scrape away the solder mask and soldered a wire between the two floating ground planes.

After testing again, the LEDs lit!
Time to solder the relays.

![Four LEDs in a row lit on a circuit board](/assets/projects/relay-computer/led-test.jpg)

The relays fit perfectly into their holes, but I knew that they would fall out if I turned the PCB upside-down to solder.
I decided to use masking tape on the tops of the relays so they would stay together, and flipped the PCB with a piece of cardboard underneath to keep the relays in place.

It was done!
I had finished making the world's most inconvenient calculator.

![Twenty relays attached to a circuit board](/assets/projects/relay-computer/relays.jpg)

## Usage

My relay computer takes **two 4-bit inputs** (0&ndash;15) and outputs the **sum or difference** of the two numbers.

On the bottom-left of the circuit board, there are 9 switches: four for each input and an additon/subtraction selector.
The user would input a binary number into the top row (`A0`&ndash;`A3`), another into a bottom row (`B0`&ndash;`B3`), and flip the switch on the right to specify if they'd like to add the numbers or subtract them.

The two binary numbers would show on the bottom-left side, and the sum/difference would show underneath.
The user would then decode the binary output back in to decimal, and that would be the answer!

*(For subtraction, **subtract 16** from the output for the answer.*
*For example, if subtracting 11 from 4, `1001` would show, which decodes to 9.*
*After subtracting 16 from 9, the answer, **-7**, would show.)*

## Validity

[Merriam-Webster](https://www.merriam-webster.com/dictionary/computer) defines a **computer** as *"a programmable usually electronic device that can store, retrieve, and process data."*
Is my relay computer actually a *computer*?

This definition has four requirements:

- the computer must be **programmable**
- the computer must be able to **store data**
- the computer must be able to **retrieve data**
- the computer must be able to **process data**

And, unfortunately, my relay computer is **not a computer**.
It's just a calculator, meaning that it **can** process data, but it can't do anything else.

*(my relay computer also isn't [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness)&mdash;welps!)*

## Reflection

This project taught me a lot&mdash;from logic gates and Boolean algebra to PCB design and research.
In the future, I will use what I've learned for better understanding of low-level programming and future electronics projects.

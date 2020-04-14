# Word generator

## Table of Contents
1. [Purpose](#purpose)
2. [Features yet to be implemented](#features)
3. [Example screenshot](#screenshot)

## Purpose<a name="purpose"></a>

This tool builds random words that are based on an abstract word structure.

The user specifies comma-separated lists of letters (also allowing digraphs, trigraphs etc.) to fit in each letter 'slot', eg:
* **C**: p,t,k,s,n,h,m,n,l
* **V**: a,e,i,o,u,ai,oi

The user also specifies:
* a syllable structure composed of any combination of the letter categories, eg. in this case, **C**s and **V**s
* number of words to generate
* minimum and maximum number of syllables per word
* whether the syllable boundaries should be delineated with a hyphen
* what delimiter to use for the output list: new line, comma, or tab

Words will then be generated at random, to fit the chosen syllable structure, eg.:
* _nakupoi_
* _puni_
* _losi_
* _tupimeso_
* _ki_

Letter frequencies can be adjusted by repeating letters in the input field.

Any letters other than **C** or **V** in the structure will be used as is, eg.: **CVn** will generate something like:
* _tan_
* _pin_
* _non_

The categories **I**, **M**, and **F** are also available to use. They are particularly useful for building words with custom initial, medial, or final letters. You can simulate multi-syllable words with a structure like **IVMVF**, and by setting max syllables to 1.

## Features yet to be implemented<a name="features"></a>

* Supporting optional letters, eg. **(C)V(C)** or **CV(V)**
* Supporting phonotactic constraints (ie. combinations not allowed)
* Checks to make sure generated words are unique within the list

## Example screenshot<a name="screenshot"></a>

This example attempts to replicate the word structure of the artificial language [Toki Pona](https://en.wikipedia.org/wiki/Toki_Pona):

![Screenshot of tool](https://github.com/aaa2016/word-generator/blob/master/example.png)
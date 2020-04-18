# Word generator

## Table of Contents
1. [Purpose](#purpose)
2. [Features yet to be implemented](#features)
3. [Examples](#examples)

## Purpose<a name="purpose"></a>

This tool builds random words that are based on an abstract word structure.

The user specifies comma-separated lists of letters (also allowing digraphs, trigraphs etc.) to fit in each letter 'slot', eg:
* **C**: p,t,k,s,n,h,m,n,l
* **V**: a,e,i,o,u,ai,oi

The user also specifies:
* a syllable structure composed of any combination of the letter categories, eg. in this case, **C**s and **V**s
* number of words to generate
* minimum and maximum number of syllables per word
* whether the syllable boundaries should be delineated, and whether with a hyphen, or a user-provided option
* what delimiter to use for the output list: new line, comma, tab, or a user-provided option
* whether to make sure generated words are unique within the list (not repeated)

To run the generator, click **Generate words**.

Words will then be generated at random, to fit the chosen syllable structure, eg.:
* _nakupoi_
* _puni_
* _losi_
* _tupimeso_
* _ki_

Any letters other than **C** or **V** in the structure will be used as is, eg.: **CVn** will generate something like:
* _tan_
* _pin_
* _non_

The categories **I**, **M**, and **F** are also available to use. They are particularly useful for building words with custom initial, medial, or final letters. You can simulate multi-syllable words with a structure like **IVMVF**, and by setting maximum syllables to 1.

<a name="optionals"></a>Optional letters can be simulated by adding extra commas to the letter lists (not followed by a letter), eg. **C**: p,t,k,s,n,h,m,n,l,

<a name="frequencies"></a>Variable letter frequencies can be adjusted by repeating letters in the input field, eg. **V**: a,a,a,e,e,i.

Try the related [phoneme invetory generator](https://github.com/aaa2016/phoneme-inventory-generator/) to generate sample phoneme lists.

## Features yet to be implemented<a name="features"></a>

* Supporting optional letters, eg. **(C)V(C)** or **CV(V)**, or supporting multiple syllable structures (however, note the [workaround](#optionals) above)
* Supporting phonotactic constraints (ie. combinations not allowed)
* Automated adjustment of how often each letter from a list is used, rather than all equal frequency (however, note the [workaround](#frequencies) above)
* Automated adjustment of how often numbers of syllables occur (eg. 1 more often than 2 or 3)
* Sound change applicator on words after they have been generated

## Examples<a name="examples"></a>

By using the **Try example** buttons, you can see the word generator attempting to replicate the word structure of either Japanese or the artificial language [Toki Pona](https://en.wikipedia.org/wiki/Toki_Pona), as shown below.

![Screenshot of tool](https://github.com/aaa2016/word-generator/blob/master/example.png)
# Word generator

## Purpose

This tool builds random words that are based on an abstract word structure.

The user specifies comma-separated lists of letters to fit in each letter 'slot', eg:
* C: p,t,k,s,n,h,m,n,l
* V: a,e,i,o,u

The user also specifies:
* number of words to generate, and
* maximum number of syllables per word.

Words will then be generated at random, to fit the syllable structure **CV**, eg.:
* _nakupo_
* _puni_
* _losi_
* _tupimeso_
* _ki_


## Features yet to be implemented

* Minimum limit of syllables per word
* Supporting custom syllable structures other than **CV**, eg. **VC** or **CVC**
* Supporting optional letters, eg **(C)V(C)** or **CV(n)**
* Checks to make sure generated words are unique within the list

## Screenshot

![Screenshot of tool](https://github.com/aaa2016/word-generator/blob/master/screenshot.png)
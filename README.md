# Word generator

## Table of Contents
1. [Purpose](#s1)
2. [Features yet to be implemented](#s2)
3. [Example screenshot](#s3)

## Purpose<a name="s1"></a>

This tool builds random words that are based on an abstract word structure.

The user specifies comma-separated lists of letters to fit in each letter 'slot', eg:
* C: p,t,k,s,n,h,m,n,l
* V: a,e,i,o,u

The user also specifies:
* number of words to generate
* maximum number of syllables per word
* whether they want the syllable boundaries delineated with a hyphen

Words will then be generated at random, to fit the syllable structure **CV**, eg.:
* _nakupo_
* _puni_
* _losi_
* _tupimeso_
* _ki_

Letter frequencies can be increased by repeating letters in the input field.

## Features yet to be implemented<a name="s2"></a>

* Minimum limit of syllables per word
* Supporting custom syllable structures other than **CV**, eg. **VC** or **CVC**
* Supporting optional letters, eg. **(C)V(C)** or **CV(V)**
* Supporting other custom letter categories, eg. **CVL**
* Supporting exact letters, eg. **CVa** (all end in 'a') or **(n)V** (optional 'n')
* Supporting phonotactic constraints (ie. combinations not allowed)
* Checks to make sure generated words are unique within the list
* Different output delimiters, eg. comma or tab

## Example screenshot<a name="s3"></a>

This example attempts to replicate the word structure of the artificial language [Toki Pona](https://en.wikipedia.org/wiki/Toki_Pona):

![Screenshot of tool](https://github.com/aaa2016/word-generator/blob/master/example.png)
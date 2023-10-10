#!/bin/bash
input=`cat -`
echo "$input"
wget -r -l0 $input

## Task 1 
### Caesar cipher CLI tool

It is a CLI tool that encodes and decodes a text by Caesar cipher.

CLI tool could accept **4 options** (short alias and full name):

1. **-s, --shift:** a shift
2. **-i, --input:** an input file
3. **-o, --output:** an output file
4. **-a, --action:** an action encode/decode

**Details**:
1. Action ('encode' or 'decode') and the shift (integer) are **required**;
2. If the input file is missed, you can use stdin as an input source.
3. If the output file is missed, stdout would be used as an output destination.
4. If the input and/or output file is given but doesn't exist or this tool can't read it due to lack of permissions, there would be an error.
5. Encoding/decoding performs only for the English alphabet.

**Usage example**:
```bash
$ node caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```
> input.txt This is secret. Message about "_" symbol!

> output.txt Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!
#!/bin/sh

ls scenarios/*.js | cut -d / -f 2 | cut -d . -f 1 | while read l; do
	printf "import s%s from '../scenarios/%s.js';\n" "$l" "$l"
done

printf '\nexport default [\n'
ls scenarios/*.js | cut -d / -f 2 | cut -d . -f 1 | while read l; do
	printf '    s%s,\n' "$l"
done
printf '];\n'

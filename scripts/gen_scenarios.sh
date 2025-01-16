#!/bin/sh

ls src/scenarios/*.js | cut -d / -f 3 | cut -d . -f 1 | while read -r l; do
	printf "import s%s from './scenarios/%s.js';\n" "$l" "$l"
done

printf '\nexport default [\n'
ls src/scenarios/*.js | cut -d / -f 3 | cut -d . -f 1 | while read -r l; do
	printf '    s%s,\n' "$l"
done
printf '];\n'

# Compare Build Numbers Action

This action takes two build numbers (build A and build B) and compares them, failing the pipeline if the comparison evaluates to false.

**The order of the build numbers is important.** For example:

`build-a = 1.0.0`
`build-b = 1.0.1`
`pass-if = >`

will cause the pipeline to **fail**. This is because `1.0.0 > 1.0.1` is `false`.

## Inputs

### `build-a`

**Required** The first build number to compare.

### `build-b`

**Required** The second build number to compare.

### `pass-if`

**Required** The comparator to use. Valid comparators are:

`<` or `lt` - passes if A is **less than** B.
`<=` or `lte` - passes if A is **less than or equal to** B.
`=` or `eq` - passes if A is **equal to** B.
`<>` or `neq` - passes if A is **not equal to** B.
`>=` or `gte` - passes if A is **greater than or equal to** B.
`>` or `ge` - passes if A is **greater than** B.

## Example Usage

*Note: This action is intended to be combined with other actions that will retrieve your build numbers dynamically. Replace the values for `build-a` and `build-b` with your actual build numbers.*

```yaml
uses: codemaidenuk/compare-build-numbers-action@v1
with:
  build-a: '1.0.0'
  build-b: '1.0.1'
  pass-if: '<'
```
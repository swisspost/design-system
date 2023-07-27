# How to test scss files

1. @use your source files and @use `jest.scss` if you need an assert equal function
2. The test runner just checks if files compile without error. If you want your test to fail, write `@error("Some error")`

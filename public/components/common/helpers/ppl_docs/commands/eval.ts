/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const evalCmd = `## eval
---

### Description

Use the \'eval\' command to evaluate the expression and append the result to the search result.

### Syntax

eval &lt;field&gt;=&lt;expression&gt; \[","
&lt;field&gt;=&lt;expression&gt; \]...

-   \`field\`: Required. If the field name does not exist, a new field is created. If the field name exists, the vlaue of the existing field is replaced.
-   \`expression\`: Required. Any expression that is supported by the system.

#### Example 1: Create new fields

The following PPL example shows how to use \`eval\` to create a new field for each document. In this example, the new field is \`doubleAge\`.

    os> source=accounts | eval doubleAge = age * 2 | fields age, doubleAge ;
    fetched rows / total rows = 4/4
    +-------+-------------+
    | age   | doubleAge   |
    |-------+-------------|
    | 32    | 64          |
    | 36    | 72          |
    | 28    | 56          |
    | 33    | 66          |
    +-------+-------------+

#### Example 2: Override existing fields

The following PPL example shows how to use \`eval\` to override an existing field. In this example, the existing field \`age\` is overridden by the \`age\` field plus 1.

    os> source=accounts | eval age = age + 1 | fields age ;
    fetched rows / total rows = 4/4
    +-------+
    | age   |
    |-------|
    | 33    |
    | 37    |
    | 29    |
    | 34    |
    +-------+

#### Example 3: Create new fields based on the fields defined in the \`eval\` expression

The following PPL example shows how to use \`eval\` to create a new field based on the fields defined in the \`eval\` esperession. In this example, the new field \`ddAge\` is the evaluation result of the \`doubleAge\` field multiplied by 2. The doubleAge is defined in the eval command.

    os> source=accounts | eval doubleAge = age * 2, ddAge = doubleAge * 2 | fields age, doubleAge, ddAge ;
    fetched rows / total rows = 4/4
    +-------+-------------+---------+
    | age   | doubleAge   | ddAge   |
    |-------+-------------+---------|
    | 32    | 64          | 128     |
    | 36    | 72          | 144     |
    | 28    | 56          | 112     |
    | 33    | 66          | 132     |
    +-------+-------------+---------+

### Limitation
The \`eval\` command is not rewritten to OpenSearch DSL, it is only executed on the coordination node.
`;
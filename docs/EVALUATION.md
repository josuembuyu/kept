# Evaluation

Kept is judged on whether its output can be trusted, not on how much it produces. A tool that
extracts twelve commitments of which three are invented is worse than one that extracts eight
correct ones.

## The set

**20 real meeting transcripts, annotated by hand.** For each one, a human writes down the
commitments that were actually made, the gaps, and who owns what — before looking at any model
output.

Building this is tedious. It is also the step most teams skip: the recurring observation in the
field is that teams do not have an evals problem, they have a data-analysis problem they refuse to
do — reading production traces and categorising failure modes. It is the first thing built here,
not the last.

The set lives in `evals/`, with transcripts anonymised: names replaced consistently, company and
product names replaced, numbers changed. Anonymisation happens before a transcript enters the set,
never after.

## Metrics

| Metric | Definition | Bar |
|---|---|---|
| Extraction precision | Extracted commitments that were really made | high |
| Extraction recall | Real commitments that were extracted | secondary to precision |
| Attribution accuracy | Commitments assigned to the right person | must be near-perfect |
| Confirmation rate | Commitments the owner accepts unedited | proxy for extraction quality in the wild |
| **False `kept` rate** | Commitments reported done that were not | **blocking** |
| Justified abstention | `unknown` verdicts that were correct | high |
| Evidence nature accuracy | Commitments correctly classified verifiable vs declarative | high |
| Annoyance rate | Ignored messages and opt-outs | low |

**False `kept` rate is the blocking metric.** No other number compensates for it. A product that
tells a team something is finished when it is not has done more damage than one that says nothing.

**Precision beats recall.** Missing a commitment costs a meeting the thing it would have caught.
Inventing one costs the product its credibility on the first message.

**Attribution is judged separately from extraction**, because a commitment found but assigned to
the wrong person is not a partial success — it is the worst failure mode in the product.

## Publishing

Results go in the README as they come in, including the bad ones. A metrics table with empty cells
is more honest than a benchmark chosen after the fact.

## Failure analysis

Every wrong extraction is filed under a named failure mode, and the list of modes grows from real
output rather than from imagination. Fixes are judged by whether the mode stops appearing, not by
whether the aggregate number moved.

---
title: "Clinical prediction begins with the clock"
summary: "Before evaluating a warning model, define when its inputs become available, when a decision is made, and what the warning could change."
date: "2026-09-30"
language: "en"
status: "published"
---

A clinical prediction model needs a clear point in time at which its prediction would be used. Without that definition, an apparently useful result may depend on information that was unavailable when the decision had to be made.

This is a methodological question in my ongoing work on routine-data hypotension warnings after traumatic brain injury. The study is examining documentation delay, observation frequency, and transportability using MIMIC-IV data. Monte Carlo simulations are in progress. I am describing the question here, rather than reporting a completed validation or a clinical result.

## A measurement has more than one time

Consider a blood-pressure measurement recorded during an ICU admission. The physiological event, the measurement, and the entry into the electronic record can occur at different times. A retrospective dataset may contain a value without showing that it was available to a clinician or a model at the moment we want to reconstruct.

That distinction should influence how the prediction task is defined. A defensible analysis needs an explicit decision time, a rule for which information is available before that time, and an outcome window that begins afterwards. It also needs to state which timestamps the dataset can support and what remains uncertain.

## Observation frequency is part of the clinical setting

Patients are not necessarily observed at the same intervals. Monitoring can become more frequent when clinicians are concerned, and measurement patterns can differ across units and hospitals.

A model may therefore learn from the process of care as well as from physiology. That information is not automatically irrelevant, but its meaning needs examination. A warning that depends heavily on one institution’s documentation practices may behave differently when those practices change.

I find it useful to treat observation frequency as part of the study design. What would happen if measurements were less frequent? How sensitive is the analysis to delays? Which aspects of performance depend on assumptions about when information becomes available?

## Performance needs a clinical interpretation

Discrimination addresses one part of the problem. A warning also needs a plausible use: who would receive it, how early it would arrive, and what decision could follow. Calibration and the consequences of false warnings matter within that intended use.

Retrospective evaluation can help establish whether a proposed warning deserves further study. It does not demonstrate that using the warning improves care. That requires additional evidence, with the evaluation matched to the claim.

For this work, the immediate task is to make the timing assumptions explicit and examine how much the findings depend on them. A careful definition of the clock is part of defining the clinical question.

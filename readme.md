# Time estimator

The most advanced projects estimator in the galaxy!

```
------------------------------------------------
 Naive - Mean - Median - 60% - 70% - 80% - 90% -
------------------------------------------------
  18   -  24  -   19   - 23  - 28  - 35  - 47  -
------------------------------------------------
2.24 '  ' '|'
5.71 '  ' '||||||||||||||||||||||||'
7.42 '  ' '|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'
8.92 '  ' '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'
10.3 '  ' '||||||||||||||||||||||||||||||||||||||||||||'
11.74 ' ' '||||||||||||||||||||'
13.17 ' ' '|||||||||||'
14.7 '  ' '|||||'
16.24 ' ' '|||'
17.87 ' ' '||'
19.62 ' ' '|'
21.65 ' ' '|'
23.76 ' ' '|'
26.34 ' ' '|'
29.51 ' ' '|'
33.32 ' ' '|'
80% ------------
37.81 ' ' '|'
43.68 ' ' '|'
53.4 '  ' '|'
87.69 ' ' '|'
```

Based on the concepts presented in these articles:

- [Evidence Based Scheduling](https://www.joelonsoftware.com/2007/10/26/evidence-based-scheduling/)
- [Estimate your work better to make that planning conversation a little easier](https://blog.estimate-work.com/estimate-your-work-better-to-make-that-planning-conversation-a-little-easier-f6c6cbf40d8c)
- [How To Estimate Almost Any Software Deliverable in 90 Seconds](https://herdingcats.typepad.com/my_weblog/2013/08/how-to-estimate-almost-any-software-deliverable.html)

## The inputs

Put these in `./myspecs.js` file. You can for example do some data-cleaning before using importing your vectors for example (only use the last `n` vectors for example, and brag about machine learning!).

### Your estimation vectors

If you don't yet have those, just use `[1]` or any list of numbers that you think represent your previous estimation results. For example, `0.5` means you took 2 times as much time as planned, `2` means you did it in half the time.

### Your estimation specs

This is a list of tasks, each having four numbers: 

1. the most optimistic scenario
2. the number you think is most realistic for the task
3. the maximum number if the tasks proves to be more complex 
4. your confidence in your number (between `0-1`)
5. _optional_: I add my label for the task, it will not be used by the app

### A management overhead

My historical number is about 25%. This is stuff like emails, environment setup, booting in, etc. (Actually it's more like 33%, if I really want to come out of the closet)

## The simulation

The app will first do 100 rounds, where it "corrects" your specs with your estimation history. It will pick a random element from your estimation vectors list, and update (divide the numbers) your specs. Then it will do another 100 rounds of simulation, where it will generate a random number, based on your specs (skewed gaussian distribution).

It will then draw a distribution histogram and present at which certainty how many hours you have to provision.




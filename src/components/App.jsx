import React, { useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Feedback } from './Feedback/Feedback';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onButtonClick = event => {
    const { id } = event.target;
    switch (id) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        break;
    }
  };

  const countPositiveFeedbackPercentage = total => (good / total) * 100;

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
  };

  const total = [good, neutral, bad];
  const totalStat = total.reduce((acc, el) => acc + el, 0);

  return (
    <>
      <GlobalStyle />
      <Section title="Please leave feedback">
        <Feedback
          stats={Object.keys(statistics)}
          onLeaveFeedback={onButtonClick}
        />
      </Section>
      <Section title="Statistics">
        {totalStat === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalStat}
            percentage={countPositiveFeedbackPercentage(totalStat)}
          />
        )}
      </Section>
    </>
  );
};

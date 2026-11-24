---
type: tactic
title: "Pass and go"
category: attack
ages: [u10, u12]
level: basic
summary: "An item for the tests of the export: the left back passes the ball and keeps running."
coachingPoints:
  - "Pass the ball and run on at once."
board:
  v: 2
  court: half
  cones: []
  frames:
    - text: "LB passes the ball to CB."
      players:
        - { team: a, label: LB, at: [60, 120] }
        - { team: a, label: CB, at: [100, 120] }
      balls: [[70, 112]]
      arrows:
        - { kind: pass, from: 0, pts: [[60, 120], [100, 120]] }
    - text: "LB runs on to the goal area."
      players:
        - { team: a, label: LB, at: [60, 120] }
        - { team: a, label: CB, at: [100, 120] }
      balls: [[110, 112]]
      arrows:
        - { kind: run, from: 0, pts: [[60, 120], [70, 70]] }
---

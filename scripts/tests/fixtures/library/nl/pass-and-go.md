---
type: tactic
title: "Passen en doorlopen"
category: attack
ages: [u10, u12]
level: basic
summary: "Een item voor de tests van de export: de linkeropbouwer speelt de bal en loopt door."
coachingPoints:
  - "Speel de bal en loop meteen door."
board:
  v: 2
  court: half
  cones: []
  frames:
    - text: "LO speelt de bal naar MO."
      players:
        - { team: a, label: LO, at: [60, 120] }
        - { team: a, label: MO, at: [100, 120] }
      balls: [[70, 112]]
      arrows:
        - { kind: pass, from: 0, pts: [[60, 120], [100, 120]] }
    - text: "LO loopt door naar de cirkel."
      players:
        - { team: a, label: LO, at: [60, 120] }
        - { team: a, label: MO, at: [100, 120] }
      balls: [[110, 112]]
      arrows:
        - { kind: run, from: 0, pts: [[60, 120], [70, 70]] }
---

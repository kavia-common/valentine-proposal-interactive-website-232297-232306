#!/bin/bash
cd /home/kavia/workspace/code-generation/valentine-proposal-interactive-website-232297-232306/valentine_proposal_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


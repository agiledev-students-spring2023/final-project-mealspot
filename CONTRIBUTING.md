# Guide to Contributing

## Team Norms

### Team Values
- Team members will work together by splitting tasks among themselves and work on their own tasks.
- Team members will use Discord for communication, including Daily Standups and text messaging.
- Team members can solicit help from the rest of the team by sending a message in the team-mealspot text channel or by asking their questions during the weekly standup meetings. 
- The team will resolve conflicts by raising any disagreements during standup meetings. Each team member will voice their opinion about the issue. Lastly, all team members will propose solutions to the issue and will vote on the best way to proceed. The team will proceed with the solution receiving the most votes. 
- If a team member is failing to deliver their obligations to the team due to unforeseen circumstances, the team will communicate with that member and agree upon a way to move forward. If a team member is failing to deliver their oblitions for reasons within their control, the team will contact that member and notify them of their responsibilities. If the team member fails to cooperate, then the team will contact the professor and TAs to notify them of an unresponsive team member. 
- Team members should respond to messages directed at them within 2 days. If a sprint deadline is approaching in less than two days, team members are expected to respond to messages earlier at a reasonable time before the deadline. 

### Sprint Cadence
- Each sprint will last two weeks.

### Daily Standups 
- Daily Standups will occur at times when every team member is available. The time for a standup will be determined at the end of the previous standup and will vary based on team members' availbilities on that specific day. Daily Standups will last about 30 minutes but can be longer or shorter if needed. 
- Team members are expected to be present synchronously at every daily standup
- During Daily Standups, every member will discuss what they have been working on, what they plan to work on in the future, and what roadblocks prevent them from completing their task.
- If a team member cannot make the Daily Standup, they should notify the other members in advance and type what they have been working on, what they plan to work on, and any roadblocks preventing them from completing their task in the team-mealspot text channel on Discord.
- It is agreed upon that team members will not cover for other team members by undertaking their obligations. Each team member is responsible for delivering their own obligations.
- It is agreed upon that a team member who makes no progress on a task for two standups or more in a row will be reported to management.

### Coding Standards
- Designate a code editor and code linter all team members will use to standardize code formatting.
- Don't over-engineer. Write minimum code to get things working end to end, only then iterate to improve.
- Code for each task and spike must be peer-reviewed and pass tests before merging into the `main` branch of code.
- Always push working code, if you break the pipeline/build then fix it.
- Make granular and small commits, per feature or per bug fix.
- Provide descriptive commit messages.
- Write self documenting code. Use descriptive variable and function names. Avoid unnecessary name shortening.
- Don't leave dead/commented out code behind. If you see such code, delete it.
- Write automated tests to cover critical integration points and functionality.
- Write code that has good time complexity, avoid coding solutions with inefficient runtimes.
- Write code that is readable and easy to understand for other team members, do not sacrifice code readibility for conciseness.
- Avoid hard-coding values for permanent fixes, always write flexible code that can handle change.

## Git Workflow
- All members of the team must work on their parts of the project in separate branches and issue a pull request that must be approved by another team member to have their changes added to the main branch. 
- Pushing directly to main is prohibited.
- Before pushing, a team member must pull in order to get the latest version of the main branch and resolve any conflicts between their branch and main before pushing.
- Team members should message other team members to notify them of a pull request that needs to be approved. 

## Contribution Rules
- To contribute to the project, write any changes in a branch and issue a pull request from that branch. The pull request must be approved by another team member to add the changes to the main branch.
- Upon completion of a task or spike, a pull request should be issued containing changes that include the completed task or spike.

## Setting Up Local Development Environment Instructions
- To set up a local development environment for this project, navigate to the desired final project directory in the terminal and run the command **git clone https://github.com/agiledev-students-spring-2023/final-project-mealspot.git**.
- Then open up the final project using any IDE of your choice.

## Building and Testing Instructions
- Will be updated once the final project reaches the building and testing phase.

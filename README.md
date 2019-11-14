## Getting started

### Terminal side

##### Clone the repo

```bash
$ git clone https://github.com/msalamat/plan-your-vote-cda.git
$ cd plan-your-vote-cda/
```

##### Make sure everything is fine

```bash
$ git status
$ git branch -a
```

##### Make sure we are in develop, if not,

```bash
$ git checkout develop
```

##### Branch off and checkout into it using following the naming convention

```bash
$ git checkout -b issue-<number>
```
e.g.
```bash
$ git checkout -b issue-999
```

##### Make your changes. Then commit them to your own branch.

e.g.
I make changes to src/pages/home/index.jsx

```bash
$ git add . OR $ git add src/pages/home/index.jsx
$ git commit -m "issue-999 update main page title"
$ git push
```

You will be asked to set your upstream before. Set it like so while pushing:

```bash
$ git push --set-upstream origin issue-<number>
```
e.g.
```bash
$ git push --set-upstream origin issue-999
```

Your changes to git will be either approved or disapproved.

#### GitHub side


Now, it's time to head over to GitHub. You should see your recently pushed branch viewable on GitHub's interface. Click "Compare & pull request".

[Figure 1](https://imgur.com/5wlN54W)

Now, make sure to change to the right base repository. This step is very important, as we are not pushing into the original repository.

[Figure 2](https://imgur.com/uYQDZm2)

We wish to push our commits into the develop branch, so we select the base branch to be develop.

[Figure 3](https://imgur.com/HE74cns)

Now, give a meaningful name to your pull request by prepending your issue number to the title section.

[Figure 4](https://imgur.com/27gCLII)

Now, you can finally click the green "Create pull request" button.

If everything proceeded without failure, you should see the following page. The review will be done soon and your hard earned work will be etched into the project's history.

[Figure 5](https://imgur.com/xq1JTJc)

With a good mental, this should have been a great and easy process. Good work for helping progress your city's future, citizen.

##### Ending

Once the pull request has been approved, you are safe to delete your branch.

```bash
$ git checkout develop
$ git branch -D issue-999
```

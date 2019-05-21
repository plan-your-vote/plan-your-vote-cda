---
id: elections
title: Running Election vs. Managed Election
sidebar_label: Running Election vs. Managed Election
---

The running election indicates the election whose data is being served by the API controllers to the CDA. The managed election indicates the election whose data is being viewed and managed within the CMS. Changing the managed election does not change the running election, meaning that the CMS can edit an election’s items without changing what the CDA is viewing.

Several tables are linked to the managed election. Race, Candidate, Steps, and Social Media all have foreign keys to a particular election. These items can only be viewed and edited when their election is set as the running or managed election (on the CDA and CMS respectively). On the CMS, the admin cannot explicitly set which election each of these objects belongs to; they are automatically added to the currently-managed election.

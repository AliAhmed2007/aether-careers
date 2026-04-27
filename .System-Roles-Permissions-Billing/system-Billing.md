## 💳 Subscription Plans Overview

Our system is divided into four distinct tiers. Each tier defines a set of **Features** that are unlocked for the entire organization.

|Plan|Key|Trial|Monthly|Annually|
|---|---|---|---|---|
|**Free**|`free_org`|-|$0.00|$0.00|
|**Basic**|`basic`|15 Days|$100.00|$1,020.00|
|**Growth**|`growth`|-|$250.00|$2,580.00|
|**Enterprise**|`enterprise`|-|$1,000.00|$10,200.00|

Export to Sheets

---

## 🛠️ Feature Entitlements by Plan

A **Feature** in our system is a global toggle. If a feature is not included in the plan, all associated code logic and permissions are automatically disabled for that organization.

### 1. Free Plan

Focuses on basic evaluation and single-entry job posting.

- **Job Listing:** Core module access.
    
- **Create Job Listing:** Basic creation ability.
    
- **Post 1 Job Listing:** Limited to a single active post.
    
- **Manage Applicant Workflow:** Basic status tracking.
    
- **Job Listing Applicant:** Ability to view incoming applications.
    

### 2. Basic Plan

Includes everything in Free, plus increased volume.

- **Post 3 Job Listings:** (Replaces Post 1).
    
- **Add 1 Featured Job Listing:** Priority visibility for one post.
    

### 3. Growth Plan

Designed for scaling teams with higher volume requirements.

- **Post 10 Job Listings:** Significant volume increase.
    
- **Advanced Workflow Tools:** (As defined by the `Manage Applicant Workflow` feature).
    

### 4. Enterprise Plan

Full access to all platform capabilities.

- **Add UNLIMITED Featured Job Listings:** No caps on priority posts.
    
- **Full Suite Access:** Includes every sub-feature listed in the registry.
    

---

## 🔐 The Relationship: Features vs. Permissions

To understand how this works in the code, you must distinguish between **Billing Entitlements** and **RBAC (Role-Based Access Control)**.

### The Feature as a "Gatekeeper"

- **In Billing:** Features are assigned to the **Plan**. If the `Post 10 Job Listing` feature is missing from the plan, the API will block that action regardless of who is trying to do it.
    
- **In Roles:** Features are used to group **Permissions**.
    
    - _Example:_ The feature `Job Listing` contains the permission `org:job_listing:delete`.
        
    - Even if a user is an **Admin** with the "Delete" permission, they cannot delete a listing if the **Billing Plan** has disabled the `Job Listing` feature.
        

### Implementation Logic

When checking if a user can perform an action, the system follows this hierarchy:

1. **Check Plan:** Does the organization's plan include the required **Feature**?
    
2. **Check Role:** Does the individual user have the **Permission** associated with that feature?
    

> **Rule of Thumb:** > * **Billing Features** control _if_ the tool exists for the company.
> 
> - **Roles & Permissions** control _who_ in the company can touch the tool.
>     

---

## 📝 Configuration Instructions

When adding new functionality to the project:

1. **Create the Feature:** Add it to the Clerk Dashboard under the Billing/Features section.
    
2. **Map to Permissions:** Create specific permissions (e.g., `create`, `read`, `edit`) under that Feature namespace.
    
3. **Assign to Plans:** Determine which of the 4 tiers (Free, Basic, Growth, Enterprise) should have access to this feature.
    
4. **Code Guard:** Use the `protect()` or `has()` helpers to check for the permission. Clerk will handle the billing check automatically if the permission is tied to a billed feature.****
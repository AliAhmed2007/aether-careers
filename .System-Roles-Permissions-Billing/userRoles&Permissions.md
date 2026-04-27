# Application Roles & Permissions Reference

## Architecture Overview

Our application utilizes a strict Role-Based Access Control (RBAC) system managed via Clerk. The authorization model is hierarchical and relies on three core concepts:

1. **Features:** Namespaces that group related functionalities together (e.g., `job_listing`).
    
2. **Permissions:** Granular, specific actions that can be performed within a feature (e.g., `create`, `delete`). These combine to form unique permission keys (e.g., `org:job_listing:job_listing_create`).
    
3. **Roles:** Bundles of permissions assigned to users. A user's role dictates their access across the entire system.
    

---

## 1. User Roles

Roles define the broad job functions within the organization. When a user is assigned a role, their active session is automatically enriched with the associated permission keys.

|Role Name|Role Key|Description|
|---|---|---|
|**Admin**|`org:admin`|Role with elevated permissions in the organization. Has unrestricted access to all custom and system functions.|
|**Applicant Manager**|`org:applicant_manager`|A user who can approve/deny applicants and update applicant details for all job listings.|
|**Job Listing Manager**|`org:job_listing_manager`|A user who can create, update, delete, and update the status of job listings.|

Export to Sheets

---

## 2. Custom Features & Permissions

Custom permissions dictate what users can do within our application's specific domains.

### Feature: Job Listing (`job_listing`)

_The primary feature handling the lifecycle of job postings and their respective candidates._

|Permission Name|Permission Key|Description / Action|
|---|---|---|
|**Job Listing Create**|`org:job_listing:job_listing_create`|Allows the creation of new job postings.|
|**Job Listing Update**|`org:job_listing:job_listing_update`|Allows editing the details of existing job postings.|
|**Job Listing Delete**|`org:job_listing:job_listing_delete`|Allows the permanent removal of a job posting.|
|**Job Listing Change Status**|`org:job_listing:job_listing_change_status`|Allows toggling a job posting's active/inactive visibility status.|
|**Applicant Change Stage**|`org:job_listing:applicant_change_stage`|Allows moving an applicant through the hiring pipeline (e.g., interviewing, hired, rejected).|
|**Applicant Change Rating**|`org:job_listing:applicant_change_rating`|Allows modifying the internal score or rating of an applicant.|

Export to Sheets

---

## 3. System Permissions

System permissions are native to Clerk and control access to the organization's administrative settings, billing, and membership management.

|Category|Permission Name|Permission Key|
|---|---|---|
|**Profile**|Manage organization|`org:sys_profile:manage`|
||Delete organization|`org:sys_profile:delete`|
|**Billing**|Read billing|`org:sys_billing:read`|
||Manage billing|`org:sys_billing:manage`|
|**Domains**|Read domains|`org:sys_domains:read`|
||Manage domains|`org:sys_domains:manage`|
|**Memberships**|Read members|`org:sys_memberships:read`|
||Manage members|`org:sys_memberships:manage`|

Export to Sheets

---

## 4. Role-to-Permission Mapping

This matrix outlines exactly which specific keys are granted to our standard management roles. _(Note: The `Admin` role intrinsically possesses all keys below)._

### Job Listing Manager

**Scope:** Strictly focused on the job postings themselves, with basic read access to organization details.

- `org:job_listing:job_listing_create`
    
- `org:job_listing:job_listing_update`
    
- `org:job_listing:job_listing_delete`
    
- `org:job_listing:job_listing_change_status`
    
- `org:sys_billing:read`
    
- `org:sys_memberships:read`
    

### Applicant Manager

**Scope:** Strictly focused on candidate processing and evaluation.

- `org:job_listing:applicant_change_stage`
    
- `org:job_listing:applicant_change_rating`
    
- `org:sys_memberships:read`
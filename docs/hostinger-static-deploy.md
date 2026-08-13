# Hostinger static deployment

This repository publishes generated static files to the `deploy` branch. Hostinger serves that branch; it does not run Node.js or build Astro.

## Before the first production push

1. In hPanel, open the Lifetime Leveling website and use **FTP Accounts** (or the Git deployment screen) to confirm the actual document-root path shown for the domain. The normal root is `public_html`, but use hPanel's displayed value if it differs.
2. Ensure the production directory is empty before connecting the repository. Hostinger Git deployment requires the selected install path not to contain files or folders.
3. In **Websites → Manage → Git**, connect `criss10x/lifetime-leveling`, select branch `deploy`, and leave the install path empty so the studio files deploy to `public_html`.
4. Create `muslim.lifetimeleveling.com` in hPanel and point its document root to `public_html/muslim`. Do not create a second repository or a third static surface.
5. Enable Git **Auto Deployment** and add the supplied Hostinger webhook URL to the GitHub repository webhook settings for push events. Verify it is tied to the `deploy` branch.
6. Create a permanent (301) redirect from `www.lifetimeleveling.com` to `https://lifetimeleveling.com/`. Keep the non-`www` host as the canonical studio URL.

## Release sequence

1. Merge an approved source change into `main`.
2. GitHub Actions runs install, Astro checks, unit tests, both static builds, local-link validation, and deployment assembly.
3. The workflow replaces the `deploy` branch with `dist/deploy` only.
4. The GitHub push invokes Hostinger Auto Deployment. Confirm the deployment log, then visit both `https://lifetimeleveling.com/` and `https://muslim.lifetimeleveling.com/`.

The assembled layout is:

```text
public_html/          <- Lifetime Leveling studio files
public_html/muslim/   <- Muslim Leveling files
```

If hPanel does not support a subdomain document root of `public_html/muslim` on the current plan, stop before enabling the webhook and choose a supported host mapping. Do not change the Astro build into a Node.js server deployment.

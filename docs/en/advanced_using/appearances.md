
All static web content resides at `/usr/share/kvmd/web/` (source path: `/web/`).

### Icons

To replace the Logo or other icons, replace files under `/usr/share/kvmd/web/share/` (source path: `/web/share/`). For example, `svg/logo.svg` is the application logo.

### Color themes

To customize the web UI theme, edit `/usr/share/kvmd/web/share/css/user.css` and add your CSS color variables to achieve the desired palette.

Below are some palette examples that you can adjust as needed.

??? Light

    ```css
    :root {
        /* Page */
        --cs-page-default-bg: #ffffff;
        --cs-page-default-fg: #1e293b;
        --cs-page-obscure-fg: #64748b;

        /* Controls */
        --cs-control-default-bg: #f1f5f9;
        --cs-control-default-fg: #0f172a;
        --cs-control-intensive-fg: #ffffff;
        --cs-control-hovered-bg: #e2e8f0;
        --cs-control-hovered-fg: #0f172a;
        --cs-control-pressed-bg: #cbd5e1;
        --cs-control-pressed-fg: #0f172a;
        --cs-control-disabled-fg: #94a3b8;
        /* Navbar */
        --cs-navbar-default-bg: #e2e8f0;
        --cs-navbar-default-fg: #0f172a;
        --cs-navbar-item-hovered-bg: #cbd5e1;
        --cs-navbar-item-pressed-bg: #94a3b8;

        /* Windows */
        --cs-window-default-bg: #f8fafc;
        --cs-window-default-fg: #0f172a;
        --cs-window-header-default-fg: #0f172a;
        --cs-window-header-grabbed-bg: #2563eb;
        --cs-window-header-grabbed-fg: #ffffff;
        --cs-window-closer-default-fg: #64748b;
        /* Code block */
        --cs-code-default-bg: #f1f5f9;
        --cs-code-default-fg: #0f172a;
        --cs-code-comment-fg: #475569;

        /* Scrollbar */
        --cs-scroll-default-bg: #cbd5e1;
        --cs-thumb-default-bg: #2563eb;
        --cs-thumb-disabled-bg: #94a3b8;

        /* Progress */
        --cs-progress-default-bg: #e2e8f0;
        --cs-progress-default-fg: #0f172a;
        --cs-progress-bar-bg: #2563eb;

        /* Keys */
        --cs-key-default-bg: #f1f5f9;
        --cs-key-default-fg: #0f172a;
        --cs-key-hovered-bg: #cbd5e1;
        --cs-key-hovered-fg: #0f172a;
        --cs-key-pressed-bg: #94a3b8;
        --cs-key-pressed-fg: #1e293b;
        --cs-key-holded-bg: #3b82f6;
        /* Decorations */
        --cs-marker-fg: #0f172a;
        --cs-corner-bg: #2563eb;

        /* Shadows */
        --shadow-micro: 01px 2px rgba(0, 0, 0, 0.06);
        --shadow-small: 02px 4px rgba(0, 0, 0, 0.1);
        --shadow-big: 06px 12px rgba(15, 23, 42, 0.12);
        --shadow-navbar-item-pressed: 0 2px 0#2563eb inset;
        --shadow-window-fullscreen-active: 00 0 2px #2563ebinset;

        /* Borders */
        --border-default-thin: thin solid #cbd5e1;
        --border-default-2px: 2px solid #cbd5e1;
        --border-hovered-2px: 2px solid #2563eb;
        --border-navbar-item-thin: thin solid #94a3b8;
        --border-control-thin: thinsolid #cbd5e1;
        --border-key-thin: thin solid #cbd5e1;
    }
    ```

    ![image-20250204151238004](../img/image-20250204151238004.png)

    ![image-20250204151253141](../img/image-20250204151253141.png)

    ![image-20250204151403558](../img/image-20250204151403558.png)

??? Dark

    ```css
    :root {
        /* Page */
        --cs-page-default-bg: #1a1b1e;
        --cs-page-default-fg: #e2e8f0;
        --cs-page-obscure-fg: #94a3b8;

        /* Controls */
        --cs-control-default-bg: #2a2b2f;
        --cs-control-default-fg: #e2e8f0;
        --cs-control-intensive-fg: #ffffff;
        --cs-control-hovered-bg: #3a3b3f;
        --cs-control-hovered-fg: #ffffff;
        --cs-control-pressed-bg: #454750;
        --cs-control-pressed-fg: #ffffff;
        --cs-control-disabled-fg: #64748b;
        /* Navbar */
        --cs-navbar-default-bg: #141517;
        --cs-navbar-default-fg: #e2e8f0;
        --cs-navbar-item-hovered-bg: #2a2b2f;
        --cs-navbar-item-pressed-bg: #3a3b3f;

        /* Windows */
        --cs-window-default-bg: #222326;
        --cs-window-default-fg: #e2e8f0;
        --cs-window-header-default-fg: #e2e8f0;
        --cs-window-header-grabbed-bg: #3b82f6;
        --cs-window-header-grabbed-fg: #ffffff;
        --cs-window-closer-default-fg: #94a3b8;

        /* Code block */
        --cs-code-default-bg: #1a1b1e;
        --cs-code-default-fg: #e2e8f0;
        --cs-code-comment-fg: #94a3b8;

        /* Scrollbar */
        --cs-scroll-default-bg: #2a2b2f;
        --cs-thumb-default-bg: #3b82f6;
        --cs-thumb-disabled-bg: #454750;

        /* Progress */
        --cs-progress-default-bg: #2a2b2f;
        --cs-progress-default-fg: #e2e8f0;
        --cs-progress-bar-bg: #3b82f6;

        /* Keys */
        --cs-key-default-bg: #2a2b2f;
        --cs-key-default-fg: #e2e8f0;
        --cs-key-hovered-bg: #3a3b3f;
        --cs-key-hovered-fg: #ffffff;
        --cs-key-pressed-bg: #454750;
        --cs-key-pressed-fg: #94a3b8;
        --cs-key-holded-bg: #3b82f6;
        /* Decorations */
        --cs-marker-fg: #e2e8f0;
        --cs-corner-bg: #3b82f6;

        /* Shadows */
        --shadow-micro: 0 1px 2px rgba(0, 0, 0, 0.3);
        --shadow-small: 02px 4px rgba(0, 0, 0, 0.4);
        --shadow-big: 08px 16px rgba(0, 0, 0, 0.5);
        --shadow-navbar-item-pressed: 0 2px 0 #3b82f6 inset;
        --shadow-window-fullscreen-active: 0 0 0 2px #3b82f6 inset;

        /* Borders */
        --border-default-thin: thin solid #454750;
        --border-default-2px: 2pxsolid #454750;
        --border-hovered-2px: 2px solid #3b82f6;
        --border-navbar-item-thin: thin solid #2a2b2f;
        --border-control-thin: thin solid #454750;
        --border-key-thin: thin solid #454750;
    }
    ```



    ![image-20250204151927823](../img/image-20250204151927823.png)

    ![image-20250204151908607](../img/image-20250204151908607.png)

    ![image-20250204151854386](../img/image-20250204151854386.png)



??? "Default (Dark Gray)"

    ```css
    :root {
        --cs-page-default-bg: #36393f;
        --cs-page-default-fg: #c3c3c3;
        --cs-page-obscure-fg: #6c7481;

        --cs-control-default-bg: #36393f;
        --cs-control-default-fg: #c3c3c3;
        --cs-control-intensive-fg: white;
        --cs-control-hovered-bg: #2a2d31;
        --cs-control-hovered-fg: white;
        --cs-control-pressed-bg: #17191d;
        --cs-control-pressed-fg: #6c7481;
        --cs-control-disabled-fg: #6c7481;

        --cs-navbar-default-bg: #202225;
        --cs-navbar-default-fg: #c3c3c3;
        --cs-navbar-item-hovered-bg: #1a1c1f;
        --cs-navbar-item-pressed-bg: #171717;

        --cs-window-default-bg: #484b51;
        --cs-window-default-fg: #c3c3c3;
        --cs-window-header-default-fg: #aaaaaa;
        --cs-window-header-grabbed-bg: #436a8a;
        --cs-window-header-grabbed-fg: white;
        --cs-window-closer-default-fg: #6c7481;

        --cs-code-default-bg: #17191d;
        --cs-code-default-fg: #aaaaaa;
        --cs-code-comment-fg: #6c7481;

        --cs-scroll-default-bg: #6c7481;
        --cs-thumb-default-bg: #436a8a;
        --cs-thumb-disabled-bg: #202225;

        --cs-progress-default-bg: #171717;
        --cs-progress-default-fg: white;
        --cs-progress-bar-bg: #436a8a;

        --cs-key-default-bg: #3b3e43;
        --cs-key-default-fg: #c3c3c3;
        --cs-key-hovered-bg: #2a2d31;
        --cs-key-hovered-fg: white;
        --cs-key-pressed-bg: #17191d;
        --cs-key-pressed-fg: #6c7481;
        --cs-key-holded-bg: #436a8a;

        --cs-marker-fg: #5b90bb;
        --cs-corner-bg: #5b90bb;

        --shadow-micro: 1px 2px 4px 0 rgba(0, 0, 0, 0.4);
        --shadow-small: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
        --shadow-big: 0 8px 16px 0 rgba(0, 0, 0, 0.4);
        --shadow-navbar-item-pressed: 0 5px 0 #5b90bb inset;
        --shadow-window-fullscreen-active: 0 0 0 2px #5b90bb inset;

        --border-default-thin: thin solid #36393f;
        --border-default-2px: 2px solid #36393f;
        --border-hovered-2px: 2px solid #2a2d31;
        --border-navbar-item-thin: thin solid black;
        --border-control-thin: thin solid #17191d;
        --border-key-thin: thin solid #202225;
        --border-intensive-2px: 2px solid #5b90bb;
        --border-intensive-thin: thin solid #5b90bb;

        --border-window-default-2px: 2px solid #282a2e;
        --border-window-active-2px: 2px solid #5b90bb;
        --border-window-default-thin: thin solid #17191d;

        --border-navbar-menu-default-2px: 2px solid black;
        --border-navbar-menu-active-2px: 2px solid #5b90bb;
        --border-menu-item-content-top-thin: thin solid #17191d;
    }
    ```

    ![image-20250204152131632](../img/image-20250204152131632.png)

    ![image-20250204152217625](../img/image-20250204152217625.png)

    ![image-20250204152202559](../img/image-20250204152202559.png)



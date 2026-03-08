import { CmsSection } from "./cms";

const GH_CONFIG_KEY = "baller-cms-github";

export interface GitHubConfig {
  owner: string;
  repo: string;
  branch: string;
  token: string;
}

export function loadGitHubConfig(): GitHubConfig | null {
  try {
    const raw = localStorage.getItem(GH_CONFIG_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

export function saveGitHubConfig(config: GitHubConfig) {
  localStorage.setItem(GH_CONFIG_KEY, JSON.stringify(config));
}

export function clearGitHubConfig() {
  localStorage.removeItem(GH_CONFIG_KEY);
}

/**
 * Commits cms-data.json to the configured GitHub repo.
 * Uses the GitHub Contents API: PUT /repos/{owner}/{repo}/contents/{path}
 */
export async function publishToGitHub(
  config: GitHubConfig,
  sections: CmsSection[]
): Promise<{ success: boolean; message: string }> {
  const path = "public/cms-data.json";
  const content = JSON.stringify(sections, null, 2);
  const encodedContent = btoa(unescape(encodeURIComponent(content)));

  const apiUrl = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}`;

  try {
    // First, try to get the existing file to obtain its SHA (needed for updates)
    let sha: string | undefined;
    const getRes = await fetch(`${apiUrl}?ref=${config.branch}`, {
      headers: {
        Authorization: `Bearer ${config.token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (getRes.ok) {
      const existing = await getRes.json();
      sha = existing.sha;
    } else if (getRes.status !== 404) {
      const err = await getRes.json();
      return { success: false, message: err.message || `GitHub API error: ${getRes.status}` };
    }

    // PUT to create or update the file
    const putRes = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${config.token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Update CMS content",
        content: encodedContent,
        branch: config.branch,
        ...(sha ? { sha } : {}),
      }),
    });

    if (putRes.ok) {
      return { success: true, message: "Published successfully! GitHub Pages will rebuild shortly." };
    }

    const err = await putRes.json();
    return { success: false, message: err.message || `GitHub API error: ${putRes.status}` };
  } catch (e: any) {
    return { success: false, message: e.message || "Network error" };
  }
}

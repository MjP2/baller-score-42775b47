import { useState } from "react";
import { GitHubConfig, loadGitHubConfig, saveGitHubConfig, clearGitHubConfig, publishToGitHub } from "@/lib/github";
import { CmsSection } from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Upload, Settings, X, Loader2, Check } from "lucide-react";
import { toast } from "sonner";

interface GitHubPublishProps {
  sections: CmsSection[];
}

export default function GitHubPublish({ sections }: GitHubPublishProps) {
  const [config, setConfig] = useState<GitHubConfig | null>(loadGitHubConfig);
  const [showSetup, setShowSetup] = useState(false);
  const [publishing, setPublishing] = useState(false);

  // Setup form state
  const [owner, setOwner] = useState(config?.owner || "");
  const [repo, setRepo] = useState(config?.repo || "");
  const [branch, setBranch] = useState(config?.branch || "main");
  const [token, setToken] = useState(config?.token || "");

  const handleSaveConfig = () => {
    if (!owner || !repo || !token) {
      toast.error("Please fill in all required fields");
      return;
    }
    const newConfig: GitHubConfig = { owner, repo, branch: branch || "main", token };
    saveGitHubConfig(newConfig);
    setConfig(newConfig);
    setShowSetup(false);
    toast.success("GitHub configuration saved");
  };

  const handleDisconnect = () => {
    clearGitHubConfig();
    setConfig(null);
    setOwner("");
    setRepo("");
    setBranch("main");
    setToken("");
    toast.info("GitHub disconnected");
  };

  const handlePublish = async () => {
    if (!config) {
      setShowSetup(true);
      return;
    }
    setPublishing(true);
    const result = await publishToGitHub(config, sections);
    setPublishing(false);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  if (showSetup) {
    return (
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Github size={18} className="text-foreground" />
            <h3 className="font-display font-semibold text-foreground">GitHub Setup</h3>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowSetup(false)}>
            <X size={14} />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Enter your repo details and a{" "}
          <a href="https://github.com/settings/tokens/new?scopes=repo&description=Baller+CMS" target="_blank" rel="noopener" className="text-primary underline">
            Personal Access Token
          </a>{" "}
          with <code className="text-primary">repo</code> scope.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Owner / Org *</Label>
            <Input value={owner} onChange={e => setOwner(e.target.value)} placeholder="your-username" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Repository *</Label>
            <Input value={repo} onChange={e => setRepo(e.target.value)} placeholder="baller-score" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Branch</Label>
            <Input value={branch} onChange={e => setBranch(e.target.value)} placeholder="main" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Personal Access Token *</Label>
            <Input type="password" value={token} onChange={e => setToken(e.target.value)} placeholder="ghp_..." />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSaveConfig} className="gap-2">
            <Check size={14} /> Save & Connect
          </Button>
          <Button variant="ghost" onClick={() => setShowSetup(false)}>Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button onClick={handlePublish} disabled={publishing} className="gap-2 bg-gradient-cta hover:opacity-90">
        {publishing ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
        {config ? "Publish to GitHub" : "Connect GitHub to Publish"}
      </Button>
      {config && (
        <>
          <span className="text-xs text-muted-foreground">
            {config.owner}/{config.repo}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setShowSetup(true); setOwner(config.owner); setRepo(config.repo); setBranch(config.branch); setToken(config.token); }}>
            <Settings size={14} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={handleDisconnect}>
            <X size={14} />
          </Button>
        </>
      )}
    </div>
  );
}

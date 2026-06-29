import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertOctagon, RotateCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in module:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <Card className="max-w-md w-full border-destructive/20 shadow-lg bg-destructive/5 animate-in zoom-in-95 duration-200">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-destructive">Module Error</CardTitle>
                <p className="text-xs text-muted-foreground">A component in this module failed to load.</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <p className="text-sm text-foreground/80 font-mono bg-background/50 p-3 rounded border overflow-x-auto max-h-24">
                {this.state.error?.message || "Unknown rendering exception"}
              </p>
              <Button onClick={this.handleReset} size="sm" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retry Loading Module
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;

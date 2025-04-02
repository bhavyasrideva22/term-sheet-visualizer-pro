
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Download, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PdfGenerationData, generateTermSheetPdf } from '../utils/pdfGenerator';

interface ShareOptionsProps {
  pdfData: PdfGenerationData | null;
  disabled: boolean;
}

const ShareOptions: React.FC<ShareOptionsProps> = ({ pdfData, disabled }) => {
  const [email, setEmail] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  
  const handleDownload = () => {
    if (!pdfData) {
      toast({
        title: "No data available",
        description: "Please calculate the term sheet first.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const pdfBlob = generateTermSheetPdf(pdfData);
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${pdfData.inputs.companyName}-Term-Sheet-${pdfData.date}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Success!",
        description: "Term sheet PDF has been downloaded.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleSendEmail = () => {
    if (!pdfData) {
      toast({
        title: "No data available",
        description: "Please calculate the term sheet first.",
        variant: "destructive"
      });
      return;
    }
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    setSendingEmail(true);
    
    // Simulate sending email (in a real app, this would call an API)
    setTimeout(() => {
      setSendingEmail(false);
      setShowEmailDialog(false);
      setEmail('');
      
      toast({
        title: "Email sent!",
        description: `Term sheet has been sent to ${email}`,
      });
    }, 1500);
  };
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <Button 
        onClick={handleDownload} 
        disabled={disabled}
        className="flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
      >
        <Download size={16} />
        <span>Download PDF</span>
      </Button>
      
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogTrigger asChild>
          <Button 
            disabled={disabled} 
            variant="outline" 
            className="flex items-center gap-2 border-primary text-primary hover:bg-primary/10"
          >
            <Mail size={16} />
            <span>Email Results</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Term Sheet Results</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendEmail} disabled={sendingEmail}>
              {sendingEmail ? "Sending..." : "Send"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShareOptions;

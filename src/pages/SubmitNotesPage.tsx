import { useState } from "react";
import {
  ArrowLeft,
  Upload,
  MessageSquare,
  Phone,
  User,
  Send,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "./notes/_components/Navbar";

interface SubmitNotesPageProps {
  onBack: () => void;
}

export function SubmitNotesPage({ onBack }: SubmitNotesPageProps) {
  const [message, setMessage] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitStatus, setSubmitStatus] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please select a PDF file");
    }
  };

  const handlePdfSubmit = () => {
    if (selectedFile) {
      console.log("PDF submitted:", selectedFile.name);
      setSubmitStatus("PDF uploaded successfully!");
      setTimeout(() => setSubmitStatus(""), 3000);
    }
  };

  const handleMessageSubmit = () => {
    if (message.trim()) {
      console.log("Message submitted:", message);
      setSubmitStatus("Message sent successfully!");
      setMessage("");
      setTimeout(() => setSubmitStatus(""), 3000);
    }
  };

  const handleContactSubmit = () => {
    if (contactName.trim() && (contactEmail.trim() || contactPhone.trim())) {
      console.log("Contact details submitted:", {
        contactName,
        contactEmail,
        contactPhone,
      });
      setSubmitStatus("Contact details saved successfully!");
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setTimeout(() => setSubmitStatus(""), 3000);
    }
  };

  const handleWhatsApp = () => {
    const phoneNumber = "+1234567890"; // Replace with actual WhatsApp number
    const message = "Hi! I would like to submit notes to your platform.";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleEmail = () => {
    const email = "scoobydoopydoo@gmail.com"; // Replace with actual email
    const subject = "Note Submission Inquiry";
    const body = "Hi! I would like to submit notes to your platform.";
    window.open(
      `mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Topics
          </Button>

          <h1 className="text-4xl font-bold mb-4 text-gradient">
            Submit Your Notes
          </h1>
          <p className="text-muted-foreground text-lg">
            Share your knowledge with fellow students. Upload PDFs, send
            messages, or get in touch with us.
          </p>
        </div>

        {submitStatus && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
            {submitStatus}
          </div>
        )}

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Choose Your Submission Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pdf" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="pdf" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Submit PDF
                </TabsTrigger>
                <TabsTrigger value="message" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Send Message
                </TabsTrigger>
                <TabsTrigger value="contact" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Us
                </TabsTrigger>
                <TabsTrigger value="details" className="gap-2">
                  <User className="h-4 w-4" />
                  Your Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pdf" className="space-y-6 mt-6">
                <div className="text-center space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">
                      Upload Your PDF Notes
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Select a PDF file containing your notes to share with
                      other students
                    </p>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="max-w-sm mx-auto"
                    />
                    {selectedFile && (
                      <p className="mt-2 text-sm text-green-600">
                        Selected: {selectedFile.name}
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={handlePdfSubmit}
                    disabled={!selectedFile}
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Upload PDF
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="message" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about the notes you'd like to submit, ask questions, or share feedback..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[150px] mt-2"
                    />
                  </div>
                  <Button
                    onClick={handleMessageSubmit}
                    disabled={!message.trim()}
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={handleWhatsApp}
                  >
                    <CardContent className="p-6 text-center">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                      <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
                      <p className="text-muted-foreground mb-4">
                        Send us a message on WhatsApp for quick communication
                      </p>
                      <Button variant="outline" className="gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Open WhatsApp
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={handleEmail}
                  >
                    <CardContent className="p-6 text-center">
                      <Mail className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                      <h3 className="text-lg font-semibold mb-2">Email</h3>
                      <p className="text-muted-foreground mb-4">
                        Send us an email with your notes or questions
                      </p>
                      <Button variant="outline" className="gap-2">
                        <Mail className="h-4 w-4" />
                        Send Email
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-6 mt-6">
                <div className="space-y-4 max-w-md mx-auto">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <Button
                    onClick={handleContactSubmit}
                    disabled={
                      !contactName.trim() ||
                      (!contactEmail.trim() && !contactPhone.trim())
                    }
                    className="w-full gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Submit Details
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

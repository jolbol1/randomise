"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { TwitterShareButton } from "./TwitterShareButton";
import { faker } from "@faker-js/faker";
import { LuckyOptions } from "@/types/types";

function generateRandomString(options: LuckyOptions): string {
  const { dictionaryOnly, includeNumbers, includeLetters, wordLength } =
    options;

  const wordLengthNumber = parseInt(wordLength) || 0;

  if (dictionaryOnly) {
    if (wordLengthNumber === 0) {
      return faker.word.sample();
    } else {
      if (wordLengthNumber === 1) {
        return faker.string.alpha(1);
      }
      return faker.word.sample({
        length: wordLengthNumber,
        strategy: "closest",
      });
    }
  }

  if (includeLetters && includeNumbers) {
    return faker.string.alphanumeric({
      length: wordLengthNumber || faker.number.int({ min: 1, max: 10 }),
    });
  } else if (includeLetters) {
    return faker.string.alpha({
      length: wordLengthNumber || faker.number.int({ min: 1, max: 10 }),
    });
  } else if (includeNumbers) {
    return faker.string.numeric({
      length: wordLengthNumber || faker.number.int({ min: 1, max: 10 }),
    });
  }

  // Fallback to a random word if no characters are selected
  return faker.word.sample();
}

function LuckyOptionsCard({
  options,
  setOptions,
}: {
  options: LuckyOptions;
  setOptions: (options: LuckyOptions) => void;
}) {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="text-center">Lucky Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="dictionary"
              checked={options.dictionaryOnly}
              onCheckedChange={(checked) =>
                setOptions({ ...options, dictionaryOnly: checked as boolean })
              }
            />
            <Label htmlFor="dictionary">Dictionary only</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="numbers"
              checked={options.includeNumbers}
              onCheckedChange={(checked) =>
                setOptions({ ...options, includeNumbers: checked as boolean })
              }
              disabled={options.dictionaryOnly}
            />
            <Label
              htmlFor="numbers"
              className={options.dictionaryOnly ? "text-muted-foreground" : ""}
            >
              Include numbers
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="letters"
              checked={options.includeLetters}
              onCheckedChange={(checked) =>
                setOptions({ ...options, includeLetters: checked as boolean })
              }
              disabled={options.dictionaryOnly}
            />
            <Label
              htmlFor="letters"
              className={options.dictionaryOnly ? "text-muted-foreground" : ""}
            >
              Include letters
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="length">Word length:</Label>
            <Input
              id="length"
              type="number"
              value={options.wordLength}
              onChange={(e) =>
                setOptions({
                  ...options,
                  wordLength: e.target.value,
                })
              }
              min="0"
              max="20"
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">(0 for auto)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LuckyButton() {
  const { toast } = useToast();
  const [options, setOptions] = useState<LuckyOptions>({
    dictionaryOnly: true,
    includeNumbers: false,
    includeLetters: true,
    wordLength: "0",
  });

  const handleLucky = () => {
    console.log("OPTIONS", options);
    const randomTerm = generateRandomString(options);
    const url = `https://${encodeURIComponent(randomTerm)}.vercel.app`;

    window.open(url, "_blank");

    toast({
      title: "Did you find something funny/cool?",
      description: (
        <div className="space-y-2">
          <p className="text-muted-foreground">
            You were redirected to:{" "}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-foreground/80 underline"
            >
              {url}
            </a>
          </p>
          <TwitterShareButton
            url={url}
            text={`I just discovered this cool site using randomise.vercel.app`}
          />
        </div>
      ),
      duration: 5000,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleLucky}
        variant="default"
        className="bg-blue-500 hover:bg-blue-600 text-white flex-grow"
      >
        I&apos;m Feeling Lucky
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <LuckyOptionsCard options={options} setOptions={setOptions} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

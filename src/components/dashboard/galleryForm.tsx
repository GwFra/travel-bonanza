import { Photo } from "./gallery";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { CalendarIcon, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction } from "react";

export const GalleryForm = ({
  value,
  dialogHandle,
}: {
  value: Photo | undefined;
  dialogHandle: Dispatch<SetStateAction<boolean>>;
}) => {
  const FormSchema = z.object({
    location: z.string(),
    date: z.number(),
    image: z.string(),
    description: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: value,
  });

  const handleCancel = () => {
    dialogHandle(false);
    form.reset();
  };

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto p-2">
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(console.log)}>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location Image</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 border rounded-md overflow-hidden bg-muted">
                      {value?.image ? (
                        <Image
                          src={`/gallery/${value.image}`}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          <Upload className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <Input
                        {...field}
                        id="location-image"
                        // type="file"
                        // accept="image/*"
                        className="hidden"
                      />
                      <Label
                        htmlFor="location-image"
                        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 cursor-pointer"
                      >
                        Choose Image
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended size: 800x600px
                      </p>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value}
                    id="description"
                    placeholder="Describe the background or context behind this image"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Name</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        {...field}
                        id="location"
                        placeholder="e.g. Tokyo, Japan"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date Taken</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <div className="space-y-2">
                          <Button
                            type="button"
                            variant="outline"
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal"
                              // !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </div>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        {...field}
                        mode="single"
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {!value ? "Add Image" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

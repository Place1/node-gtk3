#ifndef GTK_BUTTON_HEADER
#define GTK_BUTTON_HEADER

GtkWidget *create(char*);
void attach(GtkWidget *button, GtkWidget *container);
void setSize(GtkWidget *button, gint width, gint height);

#endif

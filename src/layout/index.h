#ifndef GTK_BOX_HEADER
#define GTK_BOX_HEADER

GtkWidget *create();
void attach(GtkWidget *layout, GtkWidget *container);
void setSize(GtkWidget *layout, guint width, guint height);
void move(GtkWidget *layout, GtkWidget *child, gint positionX, gint positionY);

#endif

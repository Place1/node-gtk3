#include <gtk/gtk.h>
#include <stdio.h>
#include "index.h"

GtkWidget *create() {
  return gtk_box_new(GTK_ORIENTATION_HORIZONTAL, 0);
}

void attach(GtkWidget *box, GtkWidget *container) {
  gtk_container_add(GTK_CONTAINER(container), box);
}

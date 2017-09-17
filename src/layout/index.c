#include <gtk/gtk.h>
#include <stdio.h>
#include <stdlib.h>
#include "index.h"

GtkWidget *create() {
  return gtk_layout_new(NULL, NULL);
}

void attach(GtkWidget *layout, GtkWidget *container) {
  gtk_container_add(GTK_CONTAINER(container), layout);
}

void setSize(GtkWidget *layout, guint width, guint height) {
  gtk_layout_set_size(GTK_LAYOUT(layout), width, height);
  gtk_widget_set_size_request(layout, width, height);
}

void move(GtkWidget *layout, GtkWidget *child, gint positionX, gint positionY) {
  gtk_layout_move(GTK_LAYOUT(layout), child, positionX, positionY);
}
